package fr.omatech.ordernow.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "adresse_1")
    private String adresse1;

    @Column(name = "adresse_2")
    private String adresse2;

    @Column(name = "postal_code")
    private Integer postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse1() {
        return adresse1;
    }

    public Address adresse1(String adresse1) {
        this.adresse1 = adresse1;
        return this;
    }

    public void setAdresse1(String adresse1) {
        this.adresse1 = adresse1;
    }

    public String getAdresse2() {
        return adresse2;
    }

    public Address adresse2(String adresse2) {
        this.adresse2 = adresse2;
        return this;
    }

    public void setAdresse2(String adresse2) {
        this.adresse2 = adresse2;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

    public Address postalCode(Integer postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public Address country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", adresse1='" + getAdresse1() + "'" +
            ", adresse2='" + getAdresse2() + "'" +
            ", postalCode=" + getPostalCode() +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
