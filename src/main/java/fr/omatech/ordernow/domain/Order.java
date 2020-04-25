package fr.omatech.ordernow.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import fr.omatech.ordernow.domain.enumeration.OrderStatus;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_price", precision = 21, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_date")
    private Instant updateDate;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductOrder> listProductOrders = new HashSet<>();

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FormulaOrder> listFormulaOrders = new HashSet<>();

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RestaurantTable> listTables = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public Order totalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public Order status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Order createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public Order updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public Set<ProductOrder> getListProductOrders() {
        return listProductOrders;
    }

    public Order listProductOrders(Set<ProductOrder> productOrders) {
        this.listProductOrders = productOrders;
        return this;
    }

    public Order addListProductOrder(ProductOrder productOrder) {
        this.listProductOrders.add(productOrder);
        productOrder.setOrder(this);
        return this;
    }

    public Order removeListProductOrder(ProductOrder productOrder) {
        this.listProductOrders.remove(productOrder);
        productOrder.setOrder(null);
        return this;
    }

    public void setListProductOrders(Set<ProductOrder> productOrders) {
        this.listProductOrders = productOrders;
    }

    public Set<FormulaOrder> getListFormulaOrders() {
        return listFormulaOrders;
    }

    public Order listFormulaOrders(Set<FormulaOrder> formulaOrders) {
        this.listFormulaOrders = formulaOrders;
        return this;
    }

    public Order addListFormulaOrder(FormulaOrder formulaOrder) {
        this.listFormulaOrders.add(formulaOrder);
        formulaOrder.setOrder(this);
        return this;
    }

    public Order removeListFormulaOrder(FormulaOrder formulaOrder) {
        this.listFormulaOrders.remove(formulaOrder);
        formulaOrder.setOrder(null);
        return this;
    }

    public void setListFormulaOrders(Set<FormulaOrder> formulaOrders) {
        this.listFormulaOrders = formulaOrders;
    }

    public Set<RestaurantTable> getListTables() {
        return listTables;
    }

    public Order listTables(Set<RestaurantTable> restaurantTables) {
        this.listTables = restaurantTables;
        return this;
    }

    public Order addListTable(RestaurantTable restaurantTable) {
        this.listTables.add(restaurantTable);
        restaurantTable.setOrder(this);
        return this;
    }

    public Order removeListTable(RestaurantTable restaurantTable) {
        this.listTables.remove(restaurantTable);
        restaurantTable.setOrder(null);
        return this;
    }

    public void setListTables(Set<RestaurantTable> restaurantTables) {
        this.listTables = restaurantTables;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", totalPrice=" + getTotalPrice() +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
